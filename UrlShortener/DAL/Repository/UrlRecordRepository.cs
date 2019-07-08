using DAL.Interfaces;
using DAL.Models;
using System.Collections.Generic;
using UrlShortener.DAL;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using UrlShortener.DAL.Utilities;

namespace DAL.Repository
{
    public class UrlRecordRepository : IUrlRecordRepository
    {
        private DataContext _dataContext;

        public UrlRecordRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task DeleteUrlRecordAsync(int id)
        {
            var urlRecord = await _dataContext.UrlRecords.FirstOrDefaultAsync(x => x.Id == id);
            if (urlRecord != null)
            {
                _dataContext.UrlRecords.Remove(urlRecord);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<UrlRecord> GetAsync(int id)
        {
            return await _dataContext.UrlRecords.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<UrlRecord>> GetAllUrlRecordsAsync()
        {
            return await _dataContext.UrlRecords.AsNoTracking().ToListAsync();
        }

        public async Task InsertAsync(UrlRecord urlRecord)
        {
                await CheckIfShortcutIsUniqueAsync(urlRecord.Shortcut);
                await _dataContext.UrlRecords.AddAsync(urlRecord);
                await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateUrlRecordAsync(UrlRecord urlRecord)
        {
            await CheckIfShortcutIsUniqueAsync(urlRecord.Shortcut, urlRecord.Id);
            _dataContext.Update(urlRecord);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<UrlRecord> GetUrlRecordByShortcutAsync(string shortcut)
        {
            return await _dataContext.UrlRecords.FirstOrDefaultAsync(x => x.Shortcut == shortcut);
        }

        private async Task CheckIfShortcutIsUniqueAsync(string shortcut, int? recordId = null)
        {
            if (recordId.HasValue)
            {
                if (await _dataContext.UrlRecords.AnyAsync(x => x.Shortcut == shortcut && x.Id != recordId.Value))
                {
                    throw new DataProcessingException(DataProcessingExceptionCodes.RecordAlreadyExists);
                }
            }
            else
            {
                if (await _dataContext.UrlRecords.AnyAsync(x => x.Shortcut == shortcut))
                {
                    throw new DataProcessingException(DataProcessingExceptionCodes.RecordAlreadyExists);
                }
            }    
        }
    }
}
