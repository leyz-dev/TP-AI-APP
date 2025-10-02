import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import Button from "@/components/Button";
import Card from "@/components/Card";
import {
  DateRange,
  DateRangeInput,
  defaultPresets,
} from "@/components/DateRangeInput";
import Input from "@/components/Input";
import { COLORS } from "@/components/Input/constants";
import NumberInput from "@/components/NumberInput";

import { useMessage } from "@/hooks/useMessage";
import { createTrip } from "@/services/trips";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { style } from "./styles";
import { FormValues } from "./types";

const TripCreate = () => {
  const { success, error } = useMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      destination: "",
      range: { start: undefined, end: undefined },
      adults: undefined,
      children: undefined,
      notes: "",
      activities: [],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activityName, setActivityName] = useState("");
  const [activityDays, setActivityDays] = useState<number | null>(null);

  const canAdd = useMemo(() => activityName.trim().length > 0, [activityName]);

  const handleAddActivity = () => {
    const name = activityName.trim();
    if (!name) return;
    append({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name,
      days: activityDays ?? undefined,
    });
    // reset
    setActivityName("");
    setActivityDays(null);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const tripId = await createTrip({
        title: data.title?.trim() || undefined,
        destination: data.destination.trim(),
        range: data.range,
        adults: data.adults ?? undefined,
        children: data.children ?? undefined,
        notes: data.notes?.trim() || undefined,
        activities: data.activities ?? [],
      });

      success("Trip created successfully.");
      // #TODO: Navigate to details page
      router.push("/trips");
    } catch (e: any) {
      console.error("Create trip failed:", e?.message ?? e);
      error("Trip create failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
      <Card style={style.createCard}>
        <Card.Header title="Trips Details" />
        <Card.Content style={style.createCardContent}>
          {/* Title */}
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Title (Optional)"
                placeholder="e.g., Summer Vacation"
                showClear
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          {/* Destination */}
          <Controller
            control={control}
            name="destination"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Destination"
                leftIcon={
                  <MaterialIcons
                    name="location-pin"
                    color={COLORS.subtext}
                    size={20}
                  />
                }
                required
                showClear
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorText={errors.destination?.message}
              />
            )}
          />

          {/* Date Range */}
          <Controller
            control={control}
            name="range"
            render={({ field: { value, onChange } }) => (
              <>
                {/* #TODO: Improve date range styling: may want to extract input field's rendering as separate component so it can be used by multiple field types */}
                <DateRangeInput
                  value={value as DateRange}
                  onChange={onChange}
                  minDate="2025-01-01"
                  presets={defaultPresets}
                />
                {errors.range?.end?.message ? (
                  <Text style={style.dateRangeErrorText}>
                    {errors.range?.end?.message as string}
                  </Text>
                ) : null}
              </>
            )}
          />

          <Card.Divider />

          {/* Companions */}
          <Card.Header
            leading={<MaterialIcons name="group" color="#000000" size={16} />}
            title="Travel Companions"
          />
          <View style={style.companionsFieldsContainer}>
            <Controller
              control={control}
              name="adults"
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  label="No. of Adult"
                  kind="integer"
                  allowNegative={false}
                  style={style.flex}
                  showClear
                  value={value ?? undefined}
                  onChangeNumber={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="children"
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  label="No. of Children"
                  kind="integer"
                  allowNegative={false}
                  style={style.flex}
                  showClear
                  value={value ?? undefined}
                  onChangeNumber={onChange}
                />
              )}
            />
          </View>

          <Card.Divider />

          {/* Activities */}
          <View style={style.activitiesContainer}>
            <Input
              label="Activities (Optional)"
              placeholder="e.g. Hiking"
              style={style.flex}
              showClear
              value={activityName}
              onChangeText={setActivityName}
            />
            <NumberInput
              label="Days"
              kind="integer"
              allowNegative={false}
              style={style.activityDaysField}
              value={activityDays ?? undefined}
              onChangeNumber={setActivityDays}
            />
            <Button
              onPress={handleAddActivity}
              style={style.buttonAddActivity}
              leftIcon={<MaterialIcons name="add" color="#FFFFFF" size={20} />}
              disabled={!canAdd}
            />
          </View>

          {/* Activities list */}
          {fields.length > 0 && (
            <View style={style.activityListContainer}>
              {fields.map((item, index) => (
                <View key={item.id} style={style.activityListItem}>
                  <View style={style.flex}>
                    <Text style={style.activityListName}>{item.name}</Text>
                    {typeof item.days === "number" && (
                      <Text style={style.actvityListDays}>
                        {item.days} {item.days === 1 ? "day" : "days"}
                      </Text>
                    )}
                  </View>

                  <Button
                    onPress={() => remove(index)}
                    leftIcon={
                      <MaterialIcons name="delete" color="#FFFFFF" size={16} />
                    }
                    size="sm"
                    variant="danger"
                  />
                </View>
              ))}
            </View>
          )}

          <Card.Divider />

          {/* Notes */}
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Notes (Optional)"
                multiline
                numberOfLines={10}
                maxLength={250}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorText={errors.notes?.message}
                showCounter
              />
            )}
          />

          <Card.Divider />

          <Button
            onPress={handleSubmit(onSubmit)}
            label="Create Trip"
            loading={isSubmitting}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default TripCreate;
