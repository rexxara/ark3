import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { back } from './utils';

export class Ark4Helper {
    public static modalRef: { destroy: () => void; update: (configUpdate: any) => void; } | undefined = undefined;
    public static showReturnToTitleModal() {
        Ark4Helper.modalRef?.destroy();
        Ark4Helper.modalRef = Modal.confirm({
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