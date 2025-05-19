using Application;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new Exception("Imediator service is unavailable");

         protected ActionResult HandleResultMe<T>(Result<T> result){
            if(!result.IsSuccess && result.Code == 404) return NotFound(result.Error);

            if(result.IsSuccess && result.Value != null) return Ok(result.Value);

            return BadRequest(result.Error);
        }


        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            else if (!result.IsSuccess)
            {
                return StatusCode(result.Code, new
                {
                    type = "https://tools.ietf.org/html/rfc9110#section-15.5",
                    title = "Error",
                    status = result.Code,
                    traceId = HttpContext.TraceIdentifier,
                    error = result.Error
                });
            }

            return NotFound();
        }

        protected ActionResult HandleNoContent(Result<bool> result)
        {
            if (result.IsSuccess && result.Value)
            {
                return NoContent(); 
            }
            else if (!result.IsSuccess)
            {
                return StatusCode(result.Code, new
                {
                    type = "https://tools.ietf.org/html/rfc9110#section-15.5",
                    title = "Error",
                    status = result.Code,
                    traceId = HttpContext.TraceIdentifier,
                    error = result.Error
                }); 
            }

            return NotFound(); 
        }
    }


}