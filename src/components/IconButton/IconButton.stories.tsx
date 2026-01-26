import { IconButton } from "./IconButton";

export default {
    title: 'Components/IconButton',
    component: IconButton,
};

export const Default = () => <IconButton icon={<h1>Default IconButton</h1>} />

// Customizable CSS demo
export const Themed = () => (
    <div style={{ "--icon-button-bg": "rgba(0,0,0,0.6)" } as React.CSSProperties}>
        <IconButton icon={<h1>Themed IconButton</h1>} />
    </div>
);

