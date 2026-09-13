import type { ComponentMeta } from "./types";

import { accordionMeta } from "./accordion";
import { alertMeta } from "./alert";
import { alertDialogMeta } from "./alert-dialog";
import { avatarMeta } from "./avatar";
import { badgeMeta } from "./badge";
import { breadcrumbMeta } from "./breadcrumb";
import { buttonMeta } from "./button";
import { cardMeta } from "./card";
import { checkboxMeta } from "./checkbox";
import { collapsibleMeta } from "./collapsible";
import { comboboxMeta } from "./combobox";
import { commandMeta } from "./command";
import { contextMenuMeta } from "./context-menu";
import { dialogMeta } from "./dialog";
import { dropdownMenuMeta } from "./dropdown-menu";
import { emptyMeta } from "./empty";
import { fieldMeta } from "./field";
import { glowMeta } from "./glow";
import { hoverCardMeta } from "./hover-card";
import { inputMeta } from "./input";
import { inputGroupMeta } from "./input-group";
import { labelMeta } from "./label";
import { magneticMeta } from "./magnetic";
import { modeSwitcherMeta } from "./mode-switcher";
import { nativeSelectMeta } from "./native-select";
import { paginationMeta } from "./pagination";
import { popoverMeta } from "./popover";
import { progressMeta } from "./progress";
import { pulseMeta } from "./pulse";
import { radioGroupMeta } from "./radio-group";
import { revealMeta } from "./reveal";
import { scrollAreaMeta } from "./scroll-area";
import { selectMeta } from "./select";
import { separatorMeta } from "./separator";
import { sheetMeta } from "./sheet";
import { skeletonMeta } from "./skeleton";
import { sliderMeta } from "./slider";
import { spinnerMeta } from "./spinner";
import { spotlightMeta } from "./spotlight";
import { switchMeta } from "./switch";
import { tableMeta } from "./table";
import { tabsMeta } from "./tabs";
import { textareaMeta } from "./textarea";
import { toastMeta } from "./toast";
import { tooltipMeta } from "./tooltip";

export const componentRegistry: ComponentMeta[] = [
  accordionMeta,
  alertMeta,
  alertDialogMeta,
  avatarMeta,
  badgeMeta,
  breadcrumbMeta,
  buttonMeta,
  cardMeta,
  checkboxMeta,
  collapsibleMeta,
  comboboxMeta,
  commandMeta,
  contextMenuMeta,
  dialogMeta,
  dropdownMenuMeta,
  emptyMeta,
  fieldMeta,
  glowMeta,
  hoverCardMeta,
  inputMeta,
  inputGroupMeta,
  labelMeta,
  magneticMeta,
  modeSwitcherMeta,
  nativeSelectMeta,
  paginationMeta,
  popoverMeta,
  progressMeta,
  pulseMeta,
  radioGroupMeta,
  revealMeta,
  scrollAreaMeta,
  selectMeta,
  separatorMeta,
  sheetMeta,
  skeletonMeta,
  sliderMeta,
  spinnerMeta,
  spotlightMeta,
  switchMeta,
  tableMeta,
  tabsMeta,
  textareaMeta,
  toastMeta,
  tooltipMeta,
];

export { componentCategories } from "./manifest";
