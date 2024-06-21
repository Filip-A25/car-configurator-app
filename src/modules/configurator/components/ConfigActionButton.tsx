interface ActionButtonProps {
  text: string;
}

export function ConfigActionButton({ text }: ActionButtonProps) {
  return (
    <button className="absolute bottom-0 bg-button-purple w-full text-light-gray-element-color text-xl py-7">
      {text}
    </button>
  );
}
