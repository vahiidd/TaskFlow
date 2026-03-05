using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlowApi.Data;
using TaskFlowApi.Dtos;
using TaskFlowApi.Entities;

namespace TaskFlowApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _db;

    public TasksController(AppDbContext db)
    {
        _db = db;
    }

    private int UserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponse>>> GetAll()
    {
        var tasks = await _db.Tasks
            .Where(t => t.UserId == UserId)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TaskResponse(
                t.Id, t.Title, t.Description, t.Status,
                t.DueDate, t.CreatedAt, t.UpdatedAt))
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponse>> Create(TaskCreateDto dto)
    {
        var t = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            DueDate = dto.DueDate,
            UserId = UserId
        };

        _db.Tasks.Add(t);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = t.Id },
            new TaskResponse(t.Id, t.Title, t.Description, t.Status, t.DueDate, t.CreatedAt, t.UpdatedAt));
    }
}