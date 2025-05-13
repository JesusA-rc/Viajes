using System;

namespace Application;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; } 
    public dynamic? Error { get; init; } 

    public int Code { get; set; } 

    public static Result<T> Success(T value) => new() {IsSuccess = true, Value = value};
    public static Result<T> Failure(string error, int code)  => new()
    {
        IsSuccess =  false,
        Error = error,
        Code = code 
    };

    public static Result<T> Failure(object error, int code) => new()
    {
        IsSuccess = false,
        Error = error,
        Code = code
    };

}