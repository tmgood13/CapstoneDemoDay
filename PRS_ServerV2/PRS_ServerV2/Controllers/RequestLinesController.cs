using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRS_ServerV2.Models;
using PRS_ServerV2.Controllers;

namespace PRS_ServerV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestLinesController : ControllerBase
    {
        private readonly PRSDbContext _context;

        public RequestLinesController(PRSDbContext context)
        {
            _context = context;
        }

        //// POST: api/RequestLines/{RequestId}/{id}
        //[HttpPost("RequestLines/{RequestId}/{id}")]
        //public async Task<ActionResult<RequestLines>> PostRequestLines(RequestLines requestLines, int RequestId, int id) {
        //    if (requestLines.Quantity < 0) {
        //        throw new Exception("Quantity must be greater than zero"); // this code has not been tested. Exceptions shouldn't be thrown?
        //    }
        //    requestLines.RequestId = RequestId;
        //    _context.RequestLines.Add(requestLines);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetRequestLines", new { id = requestLines.Id }, requestLines);
        //}

        // GET: api/RequestLines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestLines>>> GetRequestLines()
        {
            return await _context.RequestLines.ToListAsync();
        }

        // GET: api/RequestLines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestLines>> GetRequestLines(int id)
        {
            var requestLines = await _context.RequestLines.FindAsync(id);

            if (requestLines == null)
            {
                return NotFound();
            }

            return requestLines;
        }

        // PUT: api/RequestLines/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestLines(int id, RequestLines requestLines)
        {
            if (id != requestLines.Id)
            {
                return BadRequest();
            }

            _context.Entry(requestLines).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();                
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestLinesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RequestLines
        [HttpPost]
        public async Task<ActionResult<RequestLines>> PostRequestLines(RequestLines requestLines) {
            _context.RequestLines.Add(requestLines);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequestLines", new { id = requestLines.Id }, requestLines);
        }

        // DELETE: api/RequestLines/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RequestLines>> DeleteRequestLines(int id)
        {
            var requestLines = await _context.RequestLines.FindAsync(id);
            if (requestLines == null)
            {
                return NotFound();
            }

            _context.RequestLines.Remove(requestLines);
            await _context.SaveChangesAsync();

            return requestLines;
        }

        private bool RequestLinesExists(int id)
        {
            return _context.RequestLines.Any(e => e.Id == id);
        }
    }
}
