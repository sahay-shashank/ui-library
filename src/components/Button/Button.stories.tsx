import { Button, ButtonProps } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['primary', 'secondary'],
        },
        children: { control: 'text' },
    },
};

export const Primary = (args: ButtonProps) => <Button {...args} />;
Primary.args = {
    variant: 'primary',
    children: 'Primary Button',
};

export const Secondary = (args: ButtonProps) => <Button {...args} />;
Secondary.args = {
    variant: 'secondary',
    children: 'Secondary Button',
};
