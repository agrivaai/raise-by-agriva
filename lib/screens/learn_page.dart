import 'package:flutter/material.dart';

class LearnPage extends StatefulWidget {
  const LearnPage({super.key});
  @override State<LearnPage> createState() => _LearnPageState();
}

class _LearnPageState extends State<LearnPage> {
  final items = const [
    ('Rice Blast', 'ধানের ব্লাস্ট', 'Look for characteristic lesions on leaves or panicles.'),
    ('Bacterial Leaf Blight', 'ব্যাকটেরিয়াল লিফ ব্লাইট', 'Watch for water-soaked or drying leaf symptoms.'),
    ('Brown Spot', 'ব্রাউন স্পট', 'Brown lesions can occur on leaves under stressful conditions.'),
    ('Sheath Blight', 'শীথ ব্লাইট', 'Check lower sheaths and nearby plant canopy.'),
    ('Brown Planthopper', 'বাদামি গাছফড়িং', 'Inspect the plant base and leaf area for insects and stress.'),
    ('Nitrogen Deficiency', 'নাইট্রোজেন ঘাটতি', 'General yellowing may be associated with nutrient stress.'),
    ('Zinc Deficiency', 'জিংক ঘাটতি', 'Young rice leaves can show characteristic deficiency patterns.'),
    ('Water & Heat Stress', 'পানি ও তাপজনিত চাপ', 'Check field moisture, weather and plant condition together.'),
  ];
  String query = '';
  @override
  Widget build(BuildContext context) {
    final filtered = items.where((item) {
      final text = item.$1 + ' ' + item.$2 + ' ' + item.$3;
      return text.toLowerCase().contains(query.toLowerCase());
    }).toList();
    return Scaffold(
      appBar: AppBar(title: const Text('Learn', style: TextStyle(fontWeight: FontWeight.w700))),
      body: ListView(padding: const EdgeInsets.all(16), children: [
        TextField(onChanged: (v) => setState(() => query = v), decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Search rice problems...', border: OutlineInputBorder())),
        const SizedBox(height: 14),
        ...filtered.map((item) => Card(child: ExpansionTile(title: Text(item.$1, style: const TextStyle(fontWeight: FontWeight.w700)), subtitle: Text(item.$2), childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16), children: [
          Align(alignment: Alignment.centerLeft, child: Text(item.$3)),
          const SizedBox(height: 8),
          const Align(alignment: Alignment.centerLeft, child: Text('AI screening is supportive only. Confirm important field problems with a qualified local agriculture professional.', style: TextStyle(fontSize: 12)))
        ]))),
      ]),
    );
  }
}
