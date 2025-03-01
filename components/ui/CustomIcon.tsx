import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon';


const Icon = createIconSetFromIcoMoon(
  require('@/assets/icomoon/selection.json'),
  "IcoMoon",
  "icomoon.ttf"
);

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export function CustomIcon({
  name,
  size = 24,
  color = "#000",
  ...props
}: IconProps) {
  try {
    return <Icon name={name} size={size} color={color} {...props} />
  } catch (error) {
    console.log(error);
    return null;
  }

}