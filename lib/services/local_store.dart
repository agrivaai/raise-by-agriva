import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class LocalStore {
  static const fieldsKey = 'raise_fields';
  static const reportsKey = 'raise_reports';
  static Future<List<Map<String,dynamic>>> getFields() async { final p=await SharedPreferences.getInstance(); final raw=p.getString(fieldsKey); if(raw==null)return []; return List<Map<String,dynamic>>.from((jsonDecode(raw) as List).map((e)=>Map<String,dynamic>.from(e))); }
  static Future<void> saveFields(List<Map<String,dynamic>> value) async { final p=await SharedPreferences.getInstance(); await p.setString(fieldsKey,jsonEncode(value)); }
  static Future<List<Map<String,dynamic>>> getReports() async { final p=await SharedPreferences.getInstance(); final raw=p.getString(reportsKey); if(raw==null)return []; return List<Map<String,dynamic>>.from((jsonDecode(raw) as List).map((e)=>Map<String,dynamic>.from(e))); }
  static Future<void> saveReport(Map<String,dynamic> report) async { final all=await getReports(); all.insert(0,report); final p=await SharedPreferences.getInstance(); await p.setString(reportsKey,jsonEncode(all.take(50).toList())); }
}
