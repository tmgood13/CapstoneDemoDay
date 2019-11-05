using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRS_ServerV2.Models;

namespace PRS_ServerV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly PRSDbContext _context;

        public RequestsController(PRSDbContext context)
        {
            _context = context;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
        //                                                           ASSIGN REQUEST STATUS                                                ||
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        public static string ReqNew = "NEW";
        //public static string ReqEdt = "EDIT";
        public static string ReqRev = "REVIEW";
        public static string ReqApp = "APPROVED";
        public static string ReqDen = "DENIED";

        //[HttpPut("{status}/{id}")]
        public async Task<ActionResult<Requests>> SetStatus(string status, int id) {
            var request = await _context.Requests.FindAsync(id);
            if (request == null) {
                return NotFound();
            }
            request.Status = status;
            await Recalc(id);
            return Ok();
        }
 

        [HttpPut("approve/{id}")]
        public async Task<ActionResult<Requests>> SetStatusApprove(int id) {            
            return await SetStatus(ReqApp, id);
        }
        [HttpPut("deny/{id}")]
        public async Task<IActionResult> SetStatusDeny(int id, Requests request) { // will this work okay?
            var rr = request.RejectionReason;
            request = await _context.Requests.FindAsync(id);
            request.RejectionReason = rr;
            request.Status = ReqDen;
            return await PutRequests(id, request);
        }
        [HttpPut("review/{id}")]
        public async Task<ActionResult<Requests>> SetStatusReview(int id) {
            return await SetStatus(ReqRev, id);
        }
        [HttpPut("new/{id}")]
        public async Task<ActionResult<Requests>> SetStatusNew(int id) {            
            return await SetStatus(ReqNew, id);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
        //                                                           CUSTOM METHODS                                                       ||
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        public async Task Recalc(int id) {
            var request = _context.Requests.Find(id);
            if (request == null) { throw new Exception("Request Id not found"); }
            request.Total = _context.RequestLines.Where(rl => rl.RequestId == id).Sum(rl => rl.Product.Price * rl.Quantity);          
            await _context.SaveChangesAsync();
        }

        // shows all requests with new|review|edit status, excluding requests from current user
        // GET: api/Requests/inreview/{id}
        [HttpGet("review/{id}")]
        public async Task<ActionResult<IEnumerable<Requests>>> GetRequestsInReview(int id) {            
            return await _context.Requests.Where(r => r.UserId != id 
                                                                && r.Status != ReqApp 
                                                                && r.Status != ReqDen).ToListAsync();
        }

        [HttpGet("mylist/{id}")]
        public async Task<ActionResult<IEnumerable<Requests>>> GetMyRequests(int id)
        {
            return await _context.Requests.Where(r => r.UserId == id).ToListAsync();
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
        //                                                           DEFAULT METHODS                                                      ||
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


        //// GET: api/Requests
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Requests>>> GetRequests()
        //{            
        //    return await _context.Requests.ToListAsync();
        //}

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Requests>>> GetRequests() {
            var requests = await _context.Requests.ToListAsync();
            foreach(var request in requests) {
                await Recalc(request.Id);
            }
            _context.SaveChanges();
            return requests;
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Requests>> GetRequests(int id)
        {
            var requests = await _context.Requests.FindAsync(id);
            await Recalc(id);

            if (requests == null)
            {
                return NotFound();
            }
            return requests;
        }

        // PUT: api/Requests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequests(int id, Requests request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {                
                await _context.SaveChangesAsync();
                if(request.Status != ReqDen) {
                    await SetStatusReview(id);
                }
                if (request.RequestLines.Count() > 0 && request.Status != ReqDen) {
                    request.Status = ReqRev;
                }
                if (request.Total < 50 && request.Status != ReqDen) {
                    request.Status = ReqApp;
                }
                await Recalc(id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestsExists(id))
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

        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<Requests>> PostRequests(Requests request) {
            _context.Requests.Add(request);
            await SetStatusNew(request.Id);
            return CreatedAtAction("GetRequests", new { id = request.Id }, request);
        }

        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Requests>> DeleteRequests(int id)
        {
            var requests = await _context.Requests.FindAsync(id);
            if (requests == null)
            {
                return NotFound();
            }

            _context.Requests.Remove(requests);
            await _context.SaveChangesAsync();

            return requests;
        }

        private bool RequestsExists(int id)
        {            
            return _context.Requests.Any(e => e.Id == id);
        }
    }
}
