declare namespace chrome {
    namespace storage {
      interface StorageArea {
        get(keys: string | string[] | null, callback: (items: { [key: string]: any }) => void): void;
      }
    }
  }
  