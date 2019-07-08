using System;

namespace UrlShortener.DAL.Utilities
{
    public class DataProcessingException : Exception
    {
        public string Code { get; }

        protected DataProcessingException()
        {
        }

        public DataProcessingException(string code)
        {
            Code = code;
        }
    }
}
