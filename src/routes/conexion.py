import mysql.connector
from mysql.connector import Error

def conectar():
    try:
        # Conectar a la base de datos
        conexion = mysql.connector.connect(
            host='localhost',  # Cambia a la dirección de tu servidor si es necesario
            database='megamueblesdb',  # Nombre de la base de datos
            user='root',  # Usuario de la base de datos
            password=''  # Contraseña del usuario
        )

        if conexion.is_connected():
            print('Conexión exitosa a la base de datos')

            # Crear un cursor para ejecutar consultas
            cursor = conexion.cursor()
            cursor.execute("SELECT DATABASE();")
            registro = cursor.fetchone()
            print("Conectado a la base de datos:", registro)

            # Puedes ejecutar más consultas aquí
            # Por ejemplo, mostrar tablas:
            cursor.execute("SHOW TABLES;")
            tablas = cursor.fetchall()
            print("Tablas en la base de datos:")
            for tabla in tablas:
                print(tabla)

    except Error as e:
        print(f"Error al conectar a MySQL: {e}")
    
    finally:
        if conexion.is_connected():
            cursor.close()
            conexion.close()
            print("Conexión cerrada")

if __name__ == '__main__':
    conectar()
