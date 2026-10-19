namespace SpideyCafe.DTOs
{
    public class VerifyPaymentRequest
    {

        
        
            public string RazorpayOrderId { get; set; } = "";
            public string RazorpayPaymentId { get; set; } = "";
            public string RazorpaySignature { get; set; } = "";
        

    }
}
