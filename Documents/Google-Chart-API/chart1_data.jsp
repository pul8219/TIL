<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="org.json.simple.JSONArray"%>
<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%

	Connection con = null; //DB 접속에 사용할 Connection 선언
	PreparedStatement pstmt = null;
	ResultSet rs = null;
	String sql = "";

	JSONArray jsonArray = new JSONArray();
	
	JSONArray colNameArray = new JSONArray(); // 컬 타이틀 설정
	colNameArray.add("dept"); //부서명
	colNameArray.add("count"); //인원수
	
	jsonArray.add(colNameArray);

 
	try {
		
		String driver = "oracle.jdbc.driver.OracleDriver"; //오라클 드라이버 경로 설정
		String url = "jdbc:oracle:thin:@localhost:1521:orcl"; //내 DB 계정 경로 설정
		//드라이버 호출, Connection 연결
		Class.forName(driver).newInstance();
		con = DriverManager.getConnection(url, "DB사용자명", "DB패스워드");
	
		sql = "SELECT E.DEPTNO DEPTNO, D.DNAME DNAME, COUNT(E.DEPTNO) CNT FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO GROUP BY E.DEPTNO, D.DNAME";
	
		pstmt = con.prepareStatement(sql);
	
		rs = pstmt.executeQuery();
	
	 
		while(rs.next()){
		
			JSONArray rowArray = new JSONArray();
			rowArray.add(rs.getString("DNAME"));
			rowArray.add(rs.getInt("CNT"));
			
			jsonArray.add(rowArray);
		
		}//while end
		
			
	} //try end
	
	catch (Exception e) {
		e.printStackTrace();
	}
	finally {
		con.close();
	}

%>

<%= jsonArray %>

