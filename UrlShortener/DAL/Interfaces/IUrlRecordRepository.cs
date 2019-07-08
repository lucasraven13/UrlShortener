using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IUrlRecordRepository
    {
        Task InsertAsync(UrlRecord urlRecord);
        Task<IEnumerable<UrlRecord>> GetAllUrlRecordsAsync();
        Task<UrlRecord> GetAsync(int id);
        Task DeleteUrlRecordAsync(int id);
        Task UpdateUrlRecordAsync(UrlRecord urlRecord);
        Task<UrlRecord> GetUrlRecordByShortcutAsync(string shortcut);
    }
}
