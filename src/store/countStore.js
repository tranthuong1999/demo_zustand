import { create } from 'zustand';

const useCountStore = create((set) => ({
  count: 0,
  abortController: null,

  // Hàm xử lý tăng count và đảm bảo chỉ chạy tác vụ cuối cùng (takeLatest)
  incrementCount: async () => {
    const controller = new AbortController();
    set((state) => ({
      abortController: state.abortController ? (state.abortController.abort(), controller) : controller,
    }));

    try {
      // Giả lập một quá trình xử lý bất đồng bộ (như gọi API)
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 2000); // Tạo độ trễ 2 giây
        controller.signal.addEventListener("abort", () => {
          clearTimeout(timeout);
          reject(new Error("Aborted"));
        });
      });

      // Nếu không bị hủy, tăng count sau khi hoàn thành
      set((state) => ({
        count: state.count + 1,
      }));
    } catch (error) {
      console.log(error.message); // Log lỗi nếu tác vụ bị hủy
    }
  },
}));

export default useCountStore;
