export interface IUseCase<TResult = void, TParams = void> {
  exec(params: TParams): TResult;
}
