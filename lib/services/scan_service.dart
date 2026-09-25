class ScanResult {
  final String healthStatus;
  final String issue;
  final int confidence;
  final String severity;
  final List<String> observations;
  final List<String> possibleCauses;
  final List<String> nextSteps;
  final String aiNote;
  const ScanResult({required this.healthStatus, required this.issue, required this.confidence, required this.severity, required this.observations, required this.possibleCauses, required this.nextSteps, required this.aiNote});
}

class ScanService {
  Future<ScanResult> screenImage() async {
    await Future<void>.delayed(const Duration(seconds: 2));
    return const ScanResult(
      healthStatus: 'Possible Stress',
      issue: 'AI provider not connected',
      confidence: 0,
      severity: 'Unknown',
      observations: ['The image was captured successfully.', 'A production AI model is required for crop-specific screening.'],
      possibleCauses: ['Not determined without an AI vision model.'],
      nextSteps: ['Connect a supported vision AI provider.', 'Use clear photos of leaves, stems or panicles for screening.'],
      aiNote: 'Development placeholder: this must not be treated as a crop diagnosis.',
    );
  }
}
