using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Threading.Tasks;
using UrlShortener.DAL.Utilities;
using UrlShortener.Models;

namespace UrlShortener.Middleware
{
    /// <summary>
    /// Provides handling and response of unhandled exceptions
    /// </summary>
    public class ErrorMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (DataProcessingException ex)
            {
                await HandleDataProcessingExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            return context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error"
            }.ToString());
        }

        private Task HandleDataProcessingExceptionAsync(HttpContext context, DataProcessingException exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            return context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error",
                Code = exception.Code
            }.ToString());
        }
    }
}
