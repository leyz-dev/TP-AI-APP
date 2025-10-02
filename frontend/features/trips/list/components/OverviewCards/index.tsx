import Card from "@/components/Card";
import { Text, View } from "react-native";
import { style } from "./styles";

interface Props {
  upcomingCount?: number;
  ongoingCount?: number;
  completedCount?: number;
}

const OverviewCards = ({
  upcomingCount = 0,
  ongoingCount = 0,
  completedCount = 0,
}: Props) => {
  return (
    <View style={style.overviewSection}>
      <Card style={style.card}>
        <Card.Content>
          <Text style={[style.cardText, style.upcomingCountText]}>
            {upcomingCount}
          </Text>
          <Text style={style.cardText}>Upcoming</Text>
        </Card.Content>
      </Card>
      <Card style={style.card}>
        <Card.Content>
          <Text style={[style.cardText, style.ongoingCountText]}>
            {ongoingCount}
          </Text>
          <Text style={style.cardText}>Ongoing</Text>
        </Card.Content>
      </Card>
      <Card style={style.card}>
        <Card.Content>
          <Text style={[style.cardText, style.completedCountText]}>
            {completedCount}
          </Text>
          <Text style={style.cardText}>Completed</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default OverviewCards;
