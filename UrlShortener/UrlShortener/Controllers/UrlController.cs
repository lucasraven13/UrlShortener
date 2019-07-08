using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.BL.Interfaces;
using UrlShortener.BL.Models;

namespace UrlShortener.Controllers
{
    [Route("api/urls")]
    [ApiController]
    public class UrlController : BaseController
    {
        private IUrlRecordService _urlRecordService;

        public UrlController(IUrlRecordService urlRecordService)
        {
            _urlRecordService = urlRecordService;
        }

        // GET api/values
        [HttpGet]
        [HttpOptions]
        public async Task<IEnumerable<UrlRecordModel>> GetAll()
        {
            return await _urlRecordService.GetAllUrlRecordsAsync();
        }

        // GET api/urls/5
        [HttpGet("{id}")]
        public async Task<UrlRecordModel> Get(int id)
        {
            return await _urlRecordService.GetAsync(id);
        }

        // POST api/urls
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UrlRecordModel urlRecord)
        {
            await _urlRecordService.InsertAsync(urlRecord);
            return ApiResult(true);
        }

        // PUT api/urls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] UrlRecordModel urlRecord)
        {
            await _urlRecordService.UpdateUrlRecordAsync(urlRecord);
            return ApiResult(true);
        }

        // DELETE api/urls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _urlRecordService.DeleteUrlRecordAsync(id);
            return ApiResult(true);
        }

        // POST api/urls
        [HttpPost("{shortcut}")]
        public async Task<IActionResult> UseShortCut(string shortcut)
        {
            var record = await _urlRecordService.GetUrlRecordByShortcutAsync(shortcut);
            if (record != null)
            {
                return ApiResult(true, record.Url);
            }
            return ApiResult(false);
        }
    }
}
