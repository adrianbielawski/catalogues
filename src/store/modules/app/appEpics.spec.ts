import { TestScheduler } from 'rxjs/testing';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import Axios from 'axios-observable';
const { axiosInstance$ } = require('../../../axiosInstance') as {
    axiosInstance$: jest.Mocked<Axios>
};
import * as epics from './epics'
import * as actions from "./slice"

jest.mock('../../../axiosInstance')

describe('Testing rxjs', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
        axiosInstance$.get.mockReset()
    });

    describe('fetchSwitchesEpic', () => {
        it('works properly when successful', () => {
            const switchesApiResponse: Record<string, any> = { data: [] }

            testScheduler.run(({ expectObservable, cold, hot }) => {
                const action$ = hot('-a', {
                  a: { type: 'FETCH_SWITCHES_SUCCESS' }
                });

                axiosInstance$.get.mockReturnValue(
                    cold<unknown>('-r', { r: switchesApiResponse }) as AxiosObservable<unknown>
                );

                const output$ = epics.fetchSwitchesEpic(action$);

                expectObservable(output$).toBe('-s', {
                    s: actions.FETCH_SWITCHES_SUCCESS(switchesApiResponse.data),
                });
            });

            expect(actions.FETCH_SWITCHES_SUCCESS).toHaveBeenCalledTimes(1);
            expect(actions.FETCH_SWITCHES_SUCCESS).toHaveBeenCalledWith(switchesApiResponse.data);
        });
    })
});