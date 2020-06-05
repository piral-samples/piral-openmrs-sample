import { GlobalStateContext } from 'piral-core';

export function updateSession(ctx: GlobalStateContext, session: any) {
  ctx.dispatch(state => ({
    ...state,
    session,
  }));
}
