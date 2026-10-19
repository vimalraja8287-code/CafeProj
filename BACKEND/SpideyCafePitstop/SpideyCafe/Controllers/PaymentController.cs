using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpideyCafe.DTOs;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SpideyCafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly IConfiguration _congiguration;

        public PaymentController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _congiguration = configuration;
            _httpClientFactory = httpClientFactory;

        }


        [HttpPost("Create-Order")]

        public async Task<IActionResult> CreateOrder([FromBody] CreatePaymentOrderRequest request)
        {
            if (request.Amount < 1 ||
                request.Amount > 100000 ||
                decimal.Round(request.Amount, 2) != request.Amount)
            {
                return BadRequest(new
                {
                    message = "Amount must be between ₹1 and ₹100000, with at most 2 decimal places."
                });
            }

            var keyId = _congiguration["Razorpay:KeyId"];
            var keySecret = _congiguration["Razorpay:KeySecret"];

            if (string.IsNullOrWhiteSpace(keyId) ||
               string.IsNullOrWhiteSpace(keySecret))
            {
                return StatusCode(500, new
                {
                    message = "Razorpay credentials are missing."
                });
            }

            var amountInPaise = (long)(request.Amount * 100);
            var payload = new
            {
                amount = amountInPaise,
                currency = "INR",
                receipt = "cafe_" + Guid.NewGuid().ToString("N")[..16]
            };

            var client = _httpClientFactory.CreateClient();

            var credentials = Convert.ToBase64String(
              Encoding.UTF8.GetBytes($"{keyId}:{keySecret}"));

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", credentials);

            var json = JsonSerializer.Serialize(payload);

            using var content = new StringContent(
               json, Encoding.UTF8, "application/json");

            using var response = await client.PostAsync(
              "https://api.razorpay.com/v1/orders", content);

            var responseBody =
               await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, new
                {
                    message = "Razorpay order creation failed.",
                    details = responseBody
                });
            }

            using var result = JsonDocument.Parse(responseBody);

            return Ok(new
            {
                orderId = result.RootElement
                   .GetProperty("id").GetString(),
                amount = amountInPaise,
                currency = "INR",
                keyId = keyId
            });



        }


        [HttpPost("verify-payment")]

        public IActionResult VerifyPayemnt(VerifyPaymentRequest request)
        {
            var secret = _congiguration["Razorpay:KeySecret"];


            if (string.IsNullOrWhiteSpace(secret))
            {
                return StatusCode(500, new
                {
                    message = "Razorpay secret is missing."
                });
            }

            if (string.IsNullOrWhiteSpace(request.RazorpayOrderId) ||
                string.IsNullOrWhiteSpace(request.RazorpayPaymentId) ||
                string.IsNullOrWhiteSpace(request.RazorpaySignature))
            {
                return BadRequest(new
                {
                    message = "Payment verification details are required."
                });
            }

            var payload =
                         $"{request.RazorpayOrderId}|{request.RazorpayPaymentId}";


            using var hmac = new HMACSHA256(
          Encoding.UTF8.GetBytes(secret));

            var hash = hmac.ComputeHash(
          Encoding.UTF8.GetBytes(payload));

            var expectedSignature =
         Convert.ToHexString(hash).ToLowerInvariant();

            var expectedBytes = Encoding.ASCII.GetBytes(expectedSignature);
            var receivedBytes = Encoding.ASCII.GetBytes(
                request.RazorpaySignature.ToLowerInvariant());

            var isValid =
         expectedBytes.Length == receivedBytes.Length &&
         CryptographicOperations.FixedTimeEquals(
            expectedBytes, receivedBytes);


            if (!isValid)
            {
                return BadRequest(new
                {
                    verified = false,
                    message = "Payment signature verification failed."
                });
            }

            return Ok(new
            {
                verified = true,
                message = "Payment signature verified successfully.",
                paymentId = request.RazorpayPaymentId,
                orderId = request.RazorpayOrderId
            });






        }







    }
}
