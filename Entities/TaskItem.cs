using System.ComponentModel.DataAnnotations;

namespace TaskFlowApi.Entities;

public enum TaskStatus
{
    Open = 0,
    InProgress = 1,
    Done = 2
}

public class TaskItem
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = default!;

    [MaxLength(4000)]
    public string? Description { get; set; }

    public TaskStatus Status { get; set; } = TaskStatus.Open;
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = default!;

}
