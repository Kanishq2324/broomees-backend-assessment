import { 
    IsString,
    IsNotEmpty, 
    MaxLength,
    Min,
    IsInt
    } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    username: string;

    @IsInt()
    @Min(0)
    age: number;

}