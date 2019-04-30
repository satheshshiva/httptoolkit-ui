import * as React from 'react';
import { observer } from 'mobx-react';
import * as dateFns from 'date-fns';

import { styled } from '../../styles'
import { FontAwesomeIcon } from '../../icons';
import { HttpExchange } from '../../model/exchange';
import { generateHar } from '../../model/har';
import { saveFile } from '../../util';

const IconButton = styled((p: {
    className?: string,
    title: string,
    icon: string[],
    disabled: boolean,
    onClick: () => void
}) =>
    <button
        className={p.className}
        title={p.title}
        tabIndex={p.disabled ? -1 : 0}
        disabled={p.disabled}
        onClick={p.onClick}
    >
        <FontAwesomeIcon icon={p.icon} />
    </button>
)`
    border: none;
    background-color: transparent;
    color: ${p => p.theme.mainColor};
    font-size: 20px;
    padding: 5px 10px;

    &:disabled {
        opacity: 0.5;
    }

    &:not([disabled]) {
        cursor: pointer;

        &:hover, &:focus {
            outline: none;
            color: ${p => p.theme.popColor};
        }
    }
`;

export const ClearAllButton = observer((props: {
    className?: string,
    disabled: boolean,
    onClear: () => void
}) => {
    return <IconButton
        icon={['far', 'trash-alt']}
        title='Clear all'
        disabled={props.disabled}
        onClick={props.onClear}
    />
});

export const DownloadAsHarButton = observer((props: {
    className?: string,
    exchanges: HttpExchange[],
    exchangesAreFiltered: boolean
}) => {
    return <IconButton
        icon={['fas', 'download']}
        title={
            props.exchangesAreFiltered
                ? 'Download the currently filtered requests as a HAR file'
                : 'Download all requests as a HAR file'
        }
        disabled={props.exchanges.length === 0}
        onClick={() => {
            const harContent = JSON.stringify(
                generateHar(props.exchanges)
            );
            const filename = `HTTPToolkit_${
                dateFns.format(Date.now(), 'YYYY-MM-DD_HH-mm')
            }.har`;

            saveFile(filename, 'application/har+json;charset=utf-8', harContent);
        }}
    />
});