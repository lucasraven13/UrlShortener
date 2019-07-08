using AutoMapper;
using DAL.Models;
using UrlShortener.BL.Models;

namespace UrlShortener.BL.Profiles
{
    public class UrlRecordProfile: Profile
    {
        public UrlRecordProfile()
        {
            CreateMap<UrlRecord, UrlRecordModel>();
            CreateMap<UrlRecordModel, UrlRecord>();
        }
    }
}
