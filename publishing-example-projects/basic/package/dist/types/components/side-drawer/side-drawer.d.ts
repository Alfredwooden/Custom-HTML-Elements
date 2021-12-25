export declare class SideDrawer {
  showContactInfo: boolean;
  mainTitle: string;
  opened: boolean;
  onCloseDrawer(): void;
  onContentChange(content: string): void;
  open(): Promise<void>;
  render(): any[];
}
