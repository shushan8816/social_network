import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostDto } from '../dto/create-post.dto';
import { Uuid } from 'aws-sdk/clients/wisdom';
import { PostEntity } from '../entities/post.entity';
import { PostRepository } from '../post.repository';

export class CreatePostCommand implements ICommand {
  constructor(
    public readonly userId: Uuid,
    public readonly createPostDto: CreatePostDto,
  ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements ICommandHandler<CreatePostCommand, PostEntity>
{
  constructor(private postRepository: PostRepository) {}

  async execute(command: CreatePostCommand) {
    const { userId, createPostDto } = command;
    const postEntity = this.postRepository.create({ userId });
    await this.postRepository.save(postEntity);
    return postEntity;
  }
}
