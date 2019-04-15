import * as React from 'react';
import { message, notification } from 'antd';
import Http from '@server/axios'

// 这里用到ts的泛型来灵活化state和props的interface

export class ComponentExt<Props = {}, State = {}> extends React.Component<Props, State> {
    readonly $Http = Http()
    readonly $message = message
    readonly $notification = notification
}

export class StoreExt {
    readonly $Http = Http()
    readonly $message = message
    readonly $notification = notification
}