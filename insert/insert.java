import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    DatabaseHelper myDb;
    EditText editName,editCompanyname,editPhno,editDesignation ,editTextId;
    Button btnAddData;
    private SQLiteDatabase sql;
                @Override
                protected void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);
                    setContentView(R.layout.activity_main);
                    myDb = new DatabaseHelper(this);
                    editName = (EditText)findViewById(R.id.editText_name);
                    editCompanyname = (EditText)findViewById(R.id.editText_companyname);
                    editPhno = (EditText)findViewById(R.id.editText_phno);
                    editDesignation = (EditText)findViewById(R.id.editText_designation);
                    btnAddData = (Button)findViewById(R.id.button_add);
                    AddData();
                }
               public  void AddData() {
                    btnAddData.setOnClickListener(
                            new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    String name = editName.getText().toString();
                                    String company = editCompanyname.getText().toString();
                                    String des = editDesignation.getText().toString();
                                    String phno = editPhno.getText().toString();
                                    if (TextUtils.isEmpty(name)) {
                                        Toast.makeText(MainActivity.this, "Plase enter the Name", Toast.LENGTH_LONG).show();
                                        return;
                                    }
                                    if (TextUtils.isEmpty(company)) {
                                        Toast.makeText(MainActivity.this, "Plase enter the Company Name", Toast.LENGTH_LONG).show();
                                        return;
                                    }
                                    if (TextUtils.isEmpty(des)) {
                                        Toast.makeText(MainActivity.this, "Plase enter the Desigantion", Toast.LENGTH_LONG).show();
                                        return;
                                    }
                                    if (TextUtils.isEmpty(phno)) {
                                        Toast.makeText(MainActivity.this, "Plase enter the Contact Number", Toast.LENGTH_LONG).show();
                                        return;
                                    }
                                    boolean isInserted = myDb.insertData(name, company, des, phno);
                                    if (isInserted == true){
                                        Toast.makeText(MainActivity.this, "Data Inserted", Toast.LENGTH_LONG).show();
                                    editName.setText("");
                                    editDesignation.setText("");
                                    editPhno.setText("");
                                    editCompanyname.setText("");
                                }
                                    else
                                        Toast.makeText(MainActivity.this,"Data not Inserted",Toast.LENGTH_LONG).show();
                                }
                            }
                    );
                }
                public void showMessage(String title,String Message){
                    AlertDialog.Builder builder = new AlertDialog.Builder(this);
                    builder.setCancelable(true);
                    builder.setTitle(title);
                    builder.setMessage(Message);
                    builder.show();
                }
}



