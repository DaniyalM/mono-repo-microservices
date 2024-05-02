import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "../../../../apps/auth/src/users/models/users.schema";
const getCurrentUserViaContext = (context: ExecutionContext): UserDocument => context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        return getCurrentUserViaContext(context)
    }
)