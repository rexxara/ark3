import * as React from 'react'
import { Progress, Button, Card } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { vw } from '../../../utils/getSize';
import {Setting} from '../actions'
interface IProps {
    value: number,
    title: string,
    dispatch: Function,
    typeKey:string,
    setting:Setting
}
const VolControllor = (props: IProps) => {
    const { value, title ,typeKey} = props
    const increase = () => {
        let percent = value + 10;
        if (percent > 100) {
            percent = 100;
        }
        props.dispatch({ type: 'audio/setSetting', payload: { ...props.setting, [typeKey]: percent } })
    };
    const decline = () => {
        let percent = value - 10;
        if (percent < 0) {
            percent = 0;
        }
        props.dispatch({ type: 'audio/setSetting', payload: { ...props.setting, [typeKey]: percent } })
    };
    return <div className="site-card-border-less-wrapper">
        <Card title={title} bordered={false} style={{ width: vw(40) }}>
            <Progress type="circle" percent={value} format={percent => percent===100?'MAX':percent+'%'} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button.Group>
                <Button onClick={decline} icon={<MinusOutlined />} />
                <Button onClick={increase} icon={<PlusOutlined />} />
            </Button.Group>
        </Card>
    </div>
}
export default VolControllor