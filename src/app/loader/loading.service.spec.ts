import { LoadingService } from './loading.service';

describe('LoadingService', () => {

  it('should has onLoading false at the beginning', () => {
    const loadingService = new LoadingService();

    loadingService.onLoading.subscribe(value => {
      expect(value).toBe(false);
    });
  });

  it('should has onLoading true when isLoading is called with true', () => {
    const loadingService = new LoadingService();

    loadingService.isLoading = true;

    loadingService.onLoading.subscribe(value => {
      expect(value).toBe(true);
    });
  });
});
