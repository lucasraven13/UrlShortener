using Microsoft.AspNetCore.Http;

namespace UrlShortener.Utilities
{
    public class ApiUtilities
    {
        /// <summary>
        /// 200 OK response (for GET, HEAD, OPTIONS, PATCH, PUT, DELETE requests)
        /// </summary>
        public const int OkResponseCode = 200;
        /// <summary>
        /// 201 Created response (for POST requests)
        /// </summary>
        public const int OkPostResponseCode = 201;
        /// <summary>
        /// 204 No Content response (for DELETE requests)
        /// </summary>
        public const int OkDeleteResponseCode = 204;
        /// <summary>
        /// 400 BadRequest response (for errors)
        /// </summary>
        public const int FailResponseCode = 400;

        public static int GetOkCodeForHttpMethod(string httpMethod)
        {
            if (HttpMethods.IsPost(httpMethod))
                return OkPostResponseCode;
            else if (HttpMethods.IsDelete(httpMethod))
                return OkDeleteResponseCode;
            else
                return OkResponseCode;
        }
    }
}
