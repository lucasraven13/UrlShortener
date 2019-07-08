using Microsoft.AspNetCore.Mvc;
using UrlShortener.Utilities;

namespace UrlShortener.Controllers
{
    public abstract class BaseController : Controller
    {
        /// <summary>
        /// Returns the correct status code base on success value
        /// </summary>
        /// <param name="success">A result model</param>
        /// <returns>An IActionResult with either 404 (null and unsuccessful), 200 (success non-POST requests) and 201 (POST requests)</returns>
        protected IActionResult ApiResult(bool success)
        {
            if (!success)
                return BadRequest();
            else
                return StatusCode(ApiUtilities.GetOkCodeForHttpMethod(HttpContext.Request.Method));
        }

        /// <summary>
        /// Returns the correct status code base on success value
        /// </summary>
        /// <param name="success">A result model</param>
        /// <returns>An IActionResult with either 404 (null and unsuccessful), 200 (success non-POST requests) and 201 (POST requests)</returns>
        protected IActionResult ApiResult(bool success, string data)
        {
            if (!success)
                return BadRequest();
            else
                return StatusCode(ApiUtilities.GetOkCodeForHttpMethod(HttpContext.Request.Method), data);
        }
    }
}
