import { Observable, throwError, timer } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

export const retry$ = (err: Observable<any>, attempts: number = 2) => (
    err.pipe(mergeMap((_, i) => (
        i + 1 < attempts + 1
            ? timer((i + 1) * 500)
            : throwError(err)
    )))
)