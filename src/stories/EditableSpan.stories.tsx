import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableSpan} from "../components/common/EditableSpan/EditableSpan";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            action: 'Editable Span value changed',
            description: 'Editable Span value changed'
        },
        value: {
            defaultValue: 'EditableSpanExample',
            description: 'Start value EditableSpan'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {};

const TemplateDisabled: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanDisabled = TemplateDisabled.bind({});

EditableSpanDisabled.args = {
    disabled: true
};