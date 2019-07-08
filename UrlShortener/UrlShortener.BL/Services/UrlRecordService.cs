using AutoMapper;
using DAL.Interfaces;
using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using UrlShortener.BL.Interfaces;
using UrlShortener.BL.Models;

namespace UrlShortener.BL.Services
{
    public class UrlRecordService : IUrlRecordService
    {
        private readonly IUrlRecordRepository _urlRecordRepository;
        private readonly IMapper _mapper;

        public UrlRecordService(IUrlRecordRepository urlRecordRepository, IMapper mapper)
        {
            _urlRecordRepository = urlRecordRepository;
            _mapper = mapper;
        }

        public async Task DeleteUrlRecordAsync(int id)
        {
            await _urlRecordRepository.DeleteUrlRecordAsync(id);
        }

        public async Task<IEnumerable<UrlRecordModel>> GetAllUrlRecordsAsync()
        {
            return _mapper.Map<IEnumerable<UrlRecordModel>>(await _urlRecordRepository.GetAllUrlRecordsAsync());
        }

        public async Task<UrlRecordModel> GetAsync(int id)
        {
            return _mapper.Map<UrlRecordModel>(await _urlRecordRepository.GetAsync(id));
        }

        public async Task<UrlRecordModel> GetUrlRecordByShortcutAsync(string shortcut)
        {
            return _mapper.Map<UrlRecordModel>(await _urlRecordRepository.GetUrlRecordByShortcutAsync(shortcut));
        }

        public async Task InsertAsync(UrlRecordModel urlRecord)
        {
            await _urlRecordRepository.InsertAsync(_mapper.Map<UrlRecord>(urlRecord));
        }

        public async Task UpdateUrlRecordAsync(UrlRecordModel urlRecord)
        {
            await _urlRecordRepository.UpdateUrlRecordAsync(_mapper.Map<UrlRecord>(urlRecord));
        }
    }
}
