using TaskStatus = TaskFlowApi.Entities.TaskStatus;

namespace TaskFlowApi.Dtos;

public record TaskCreateDto(string Title, string? Description, TaskStatus Status, DateTime? DueDate);
public record TaskUpdateDto(string Title, string? Description, TaskStatus Status, DateTime? DueDate);
public record TaskResponse(int Id, string Title, string? Description, TaskStatus Status, DateTime? DueDate, DateTime CreatedAt, DateTime? UpdatedAt);