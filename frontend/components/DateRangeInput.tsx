import React, { useCallback, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Calendar } from "react-native-calendars";

/**
 * DateRangeInput — a lightweight, fully-controlled (with optional uncontrolled mode)
 * date range picker built on top of react-native-calendars.
 *
 * Features
 * - Controlled via `value` + `onChange` (uncontrolled via `defaultValue`)
 * - Inline or modal picker (default: modal triggered by tapping the input field)
 * - Marking type "period" with start/end and in-between days colored
 * - minDate / maxDate
 * - Disabled custom dates
 * - Optional presets (e.g., This weekend, Next 7 days)
 * - i18n-friendly formatting with Intl.DateTimeFormat
 * - Small footprint: no extra deps beyond react-native-calendars
 */

export type CalendarDay = {
  dateString: string; // "2025-10-01"
  day: number; // 1-31
  month: number; // 1-12
  year: number; // full year
  timestamp: number; // ms since epoch
};

export type ISODate = `${number}-${number}-${number}`; // e.g. "2025-10-01"

export type DateRange = {
  start?: ISODate;
  end?: ISODate;
};

export type Preset = {
  label: string;
  getRange: (today: Date) => DateRange;
};

export type DateRangeInputProps = {
  /** Controlled value */
  value?: DateRange;
  /** Uncontrolled initial value */
  defaultValue?: DateRange;
  /** Called whenever range changes */
  onChange?: (range: DateRange) => void;

  /** Bounds */
  minDate?: ISODate;
  maxDate?: ISODate;
  /** Block specific days */
  disabledDates?: ISODate[];
  /** Allow selecting same start/end */
  allowSameDay?: boolean;

  /** Input presentation */
  placeholder?: string;
  /** Custom renderer for the read-only text field that opens the calendar */
  renderInput?: (args: {
    value: DateRange;
    formatted: string;
    open: () => void;
    clear: () => void;
  }) => React.ReactNode;
  /** Optional title above the calendar in the modal */
  title?: string;
  /** Provide presets shown above calendar */
  presets?: Preset[];

  /** Calendar props */
  firstDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sun
  /** Locale for month/day names & formatter */
  locale?: string;

  /** Styles */
  style?: ViewStyle;
  textStyle?: TextStyle;
  chipStyle?: ViewStyle;
  chipTextStyle?: TextStyle;
  modalContainerStyle?: ViewStyle;
  calendarTheme?: any; // passthrough to react-native-calendars
};

const iso = (d: Date): ISODate =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    .toISOString()
    .slice(0, 10) as ISODate;

const parse = (s: ISODate) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, (m as number) - 1, d as number));
};

const clampDate = (dt: Date, min?: ISODate, max?: ISODate) => {
  let d = dt;
  if (min && d < parse(min)) d = parse(min);
  if (max && d > parse(max)) d = parse(max);
  return d;
};

const daysBetweenExclusive = (start: ISODate, end: ISODate): ISODate[] => {
  const s = parse(start);
  const e = parse(end);
  const out: ISODate[] = [];
  const cur = new Date(s);
  cur.setUTCDate(cur.getUTCDate() + 1);
  while (cur < e) {
    out.push(iso(cur));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return out;
};

const formatRange = (range: DateRange, locale: string) => {
  const { start, end } = range;
  if (!start && !end) return "";
  const fmt = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  if (start && end) {
    return `${fmt.format(parse(start))} – ${fmt.format(parse(end))}`;
  }
  return start ? fmt.format(parse(start)) : "";
};

const isDisabled = (date: ISODate, list?: ISODate[]) => !!list?.includes(date);

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  allowSameDay = true,
  placeholder = "Select dates",
  renderInput,
  title = "Select date range",
  presets,
  firstDay = 1,
  locale = "en-US",
  style,
  textStyle,
  chipStyle,
  chipTextStyle,
  modalContainerStyle,
  calendarTheme,
}) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<DateRange>(defaultValue ?? {});
  const [open, setOpen] = useState(false);

  const range = isControlled ? value! : inner;
  const formatted = useMemo(() => formatRange(range, locale), [range, locale]);

  const setRange = useCallback(
    (next: DateRange) => {
      if (!isControlled) setInner(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const clear = useCallback(() => setRange({}), [setRange]);

  const onDayPress = useCallback(
    (day: CalendarDay) => {
      const date = day.dateString as ISODate;
      if (isDisabled(date, disabledDates)) return;

      // Start a new range if none or completed
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: undefined });
        return;
      }

      // We have a start and no end yet
      if (date === range.start && allowSameDay) {
        setRange({ start: date, end: date });
        return;
      }

      // Ensure chronological order
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ start: range.start, end: date });
      }
    },
    [allowSameDay, disabledDates, range, setRange]
  );

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    const { start, end } = range;
    if (start) {
      marks[start] = {
        startingDay: !end || start <= end,
        endingDay: !!end && start === end,
        color: "#50cebb",
        textColor: "white",
      };
    }
    if (start && end && start !== end) {
      marks[end] = {
        endingDay: true,
        color: "#50cebb",
        textColor: "white",
      };
      for (const d of daysBetweenExclusive(start, end)) {
        marks[d] = { color: "#70d7c7", textColor: "white" };
      }
    }

    // Disable custom dates via `disabled` marking
    if (disabledDates?.length) {
      for (const dd of disabledDates) {
        marks[dd] = {
          ...(marks[dd] ?? {}),
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    return marks;
  }, [range, disabledDates]);

  const handlePreset = useCallback(
    (p: Preset) => {
      const today = new Date();
      let { start, end } = p.getRange(today);
      if (start) start = iso(clampDate(parse(start), minDate, maxDate));
      if (end) end = iso(clampDate(parse(end), minDate, maxDate));
      setRange({ start, end });
    },
    [maxDate, minDate, setRange]
  );

  const defaultInput = (
    <Pressable
      style={[styles.inputChip, chipStyle]}
      onPress={() => setOpen(true)}
    >
      <Text style={[styles.inputChipText, chipTextStyle]}>
        {formatted || placeholder}
      </Text>
      {!!formatted && (
        <Pressable onPress={clear} hitSlop={8}>
          <Text style={[styles.clear]} accessibilityLabel="Clear dates">
            ✕
          </Text>
        </Pressable>
      )}
    </Pressable>
  );

  return (
    <View style={style}>
      {renderInput
        ? renderInput({
            value: range,
            formatted,
            open: () => setOpen(true),
            clear,
          })
        : defaultInput}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={[styles.modalBackdrop]}>
          <View style={[styles.modalCard, modalContainerStyle]}>
            <View style={styles.headerRow}>
              <Text style={[styles.title, textStyle]}>{title}</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={8}>
                <Text style={styles.clear}>Close</Text>
              </Pressable>
            </View>

            {presets?.length ? (
              <View style={styles.presetsRow}>
                {presets.map(p => (
                  <Pressable
                    key={p.label}
                    onPress={() => handlePreset(p)}
                    style={styles.presetChip}
                  >
                    <Text style={styles.presetText}>{p.label}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            <Calendar
              firstDay={firstDay}
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={onDayPress}
              markedDates={markedDates}
              markingType="period"
              theme={calendarTheme}
              // Disable specific dates visually
              disabledByDefault={false}
            />

            <View style={styles.footerRow}>
              <Pressable onPress={clear} hitSlop={8}>
                <Text style={styles.link}>Clear</Text>
              </Pressable>
              <View style={{ flex: 1 }} />
              <Pressable
                onPress={() => setOpen(false)}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  inputChip: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputChipText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  clear: {
    fontSize: 14,
    color: "#6B7280",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  presetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  presetChip: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  presetText: {
    fontSize: 14,
    color: "#111827",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  link: {
    color: "#2563EB",
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: "#111827",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

// ---------- Example presets ----------
export const defaultPresets: Preset[] = [
  {
    label: "This weekend",
    getRange: today => {
      const d = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate()
        )
      );
      const day = d.getUTCDay();
      const satOffset = (6 - day + 7) % 7; // 6 = Saturday
      const sat = new Date(d);
      sat.setUTCDate(d.getUTCDate() + satOffset);
      const sun = new Date(sat);
      sun.setUTCDate(sat.getUTCDate() + 1);
      return { start: iso(sat), end: iso(sun) };
    },
  },
  {
    label: "Next 7 days",
    getRange: today => {
      const start = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate()
        )
      );
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 6);
      return { start: iso(start), end: iso(end) };
    },
  },
];

// ---------- Usage notes ----------
/**
 * Usage (controlled):
 *
 * const [range, setRange] = useState<DateRange>({});
 * <DateRangeInput
 *   value={range}
 *   onChange={setRange}
 *   minDate="2025-01-01"
 *   maxDate="2026-12-31"
 *   presets={defaultPresets}
 *   renderInput={({ formatted, open, clear }) => (
 *     <Pressable onPress={open} style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
 *       <Text>{formatted || "Select dates"}</Text>
 *       {formatted ? (
 *         <Pressable onPress={clear}><Text>✕</Text></Pressable>
 *       ) : null}
 *     </Pressable>
 *   )}
 * />
 */
