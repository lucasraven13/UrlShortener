using System.Collections.Generic;
using System.Threading.Tasks;
using UrlShortener.BL.Models;

namespace UrlShortener.BL.Interfaces
{
    public interface IUrlRecordService
    {
        Task InsertAsync(UrlRecordModel urlRecord);
        Task<IEnumerable<UrlRecordModel>> GetAllUrlRecordsAsync();
        Task<UrlRecordModel> GetAsync(int id);
        Task DeleteUrlRecordAsync(int id);
        Task UpdateUrlRecordAsync(UrlRecordModel urlRecord);
        Task<UrlRecordModel> GetUrlRecordByShortcutAsync(string shortcut);
    }
}
