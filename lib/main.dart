import 'package:flutter/material.dart';

void main() => runApp(const RaiseApp());

class RaiseApp extends StatelessWidget {
  const RaiseApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'RAISE by AGRIVA',
    debugShowCheckedModeBanner: false,
    theme: ThemeData(useMaterial3: true, colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1D6B43)), scaffoldBackgroundColor: const Color(0xFFF8F7F2)),
    home: const HomePage(),
  );
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(backgroundColor: const Color(0xFFF8F7F2), title: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('RAISE', style: TextStyle(fontWeight: FontWeight.w800)), Text('BY AGRIVA', style: TextStyle(fontSize: 11, letterSpacing: 1.5))])),
    body: ListView(padding: const EdgeInsets.all(20), children: [
      const SizedBox(height: 12), const Text('Rice AI Stress Evaluator'), const SizedBox(height: 12),
      const Text('Check your rice plant with AI.', style: TextStyle(fontSize: 30, fontWeight: FontWeight.w800)), const SizedBox(height: 12),
      const Text('AI-assisted screening for visible rice crop health, disease and stress clues.'), const SizedBox(height: 24),
      FilledButton.icon(onPressed: () {}, icon: const Icon(Icons.camera_alt_outlined), label: const Padding(padding: EdgeInsets.symmetric(vertical: 14), child: Text('Scan Rice Plant'))),
      const SizedBox(height: 18),
      const _FeatureCard(icon: Icons.agriculture_outlined, title: 'My Fields', subtitle: 'Manage rice fields and crop profiles.'),
      const _FeatureCard(icon: Icons.assessment_outlined, title: 'Reports', subtitle: 'Review previous AI screening results.'),
      const _FeatureCard(icon: Icons.menu_book_outlined, title: 'Learn', subtitle: 'Explore rice diseases, pests and stress.'),
      const SizedBox(height: 20), const Text('AI results are assistive screening only, not a definitive diagnosis.', style: TextStyle(fontSize: 12)),
    ]),
    bottomNavigationBar: NavigationBar(selectedIndex: 0, destinations: const [NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'), NavigationDestination(icon: Icon(Icons.camera_alt_outlined), label: 'Scan'), NavigationDestination(icon: Icon(Icons.assessment_outlined), label: 'Reports'), NavigationDestination(icon: Icon(Icons.menu_book_outlined), label: 'Learn')], onDestinationSelected: (_) {}),
  );
}

class _FeatureCard extends StatelessWidget {
  final IconData icon; final String title; final String subtitle;
  const _FeatureCard({required this.icon, required this.title, required this.subtitle});
  @override
  Widget build(BuildContext context) => Card(margin: const EdgeInsets.only(bottom: 12), child: ListTile(leading: CircleAvatar(backgroundColor: const Color(0xFFE4F0E8), child: Icon(icon, color: const Color(0xFF1D6B43))), title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)), subtitle: Text(subtitle), trailing: const Icon(Icons.chevron_right)));
}
