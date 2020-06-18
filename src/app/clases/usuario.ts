import { UserInfo } from 'firebase';
import { Vehiculo } from './vehiculo';

export class Usuario implements UserInfo {
    public displayName: string;
    public email: string;
    public phoneNumber: string;
    public photoURL: string;
    public providerId: string;
    public uid: string;
    public tipo: string;
    public direccion?: string;
    public vehiculos?: Vehiculo[];
}
