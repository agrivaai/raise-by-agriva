import 'package:flutter/material.dart';

class ReportsPage extends StatelessWidget {
  const ReportsPage({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Reports', style: TextStyle(fontWeight: FontWeight.w700))),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      Card(child: ListTile(
        leading: const CircleAvatar(child: Icon(Icons.history)),
        title: const Text('No saved reports yet'),
        subtitle: const Text('Your completed rice plant screenings will appear here.'),
      )),
      const SizedBox(height: 14),
      const Text('Reports will include health status, confidence, severity, observations and next steps.', style: TextStyle(fontSize: 13)),
    ]),
  );
}
