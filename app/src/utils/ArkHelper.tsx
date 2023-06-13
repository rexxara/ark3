import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { back } from './utils';

export class Ark4Helper {
    public static showReturnToTitleModal() {
        Modal.confirm({
            title: '游戏结束，回到主菜单？',
            icon: <ExclamationCircleOutlined />,
            content: '游戏结束，回到主菜单？',
            onOk() {
                back();
            },
            onCancel() { },
        });
    }

}