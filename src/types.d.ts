import { CompletedRequest, CompletedResponse } from 'mockttp';
import { ComponentClass } from 'react';
import { TrafficSource } from './model/sources';
import { HtkContentType } from './content-types';
import { ExchangeCategory } from './exchange-colors';

export type DomWithProps<T, Props> = ComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<T> & Props, T>>;

export type WithInjectedStore<
    C extends React.ComponentType<any>,
> = C extends React.ComponentType<infer T> ?
    React.ComponentType<Pick<T, Exclude<keyof T, 'store'>>> : never;

export type HtkRequest = CompletedRequest & {
    parsedUrl: URL,
    source: TrafficSource,
    contentType: HtkContentType
};

export type HtkResponse = CompletedResponse & { contentType: HtkContentType };

export interface HttpExchange {
    id: string;
    request: HtkRequest;
    response: HtkResponse | 'aborted' | undefined;
    category: ExchangeCategory;
    searchIndex: string[];
}